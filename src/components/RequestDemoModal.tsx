'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useCreateRequest } from '@/hooks/useCreateRequest';
import { cn } from '@/lib/utils';
import { CalendarIcon, Send, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

interface RequestDemoModalProps {
    open: boolean;
    onClose: () => void;
    projectName?: string | undefined;
    locale: string;
}

export function RequestDemoModal({ open, onClose, projectName, locale }: RequestDemoModalProps) {
    const t = useTranslations('requestDemo');

    const [formData, setFormData] = useState({
        id: '',
        nameOrCompany: '',
        email: '',
        message: '',
        projectName: projectName || '',
        date: '',
        createdAt: '',
    });

    const [date, setDate] = useState<Date>();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { addRequestDemo } = useCreateRequest();

    React.useEffect(() => {
        if (projectName) {
            setFormData((prev) => ({ ...prev, projectName }));
        }
    }, [projectName]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.nameOrCompany) newErrors.nameOrCompany = t('form.placeholders.nameOrCompany');
        if (!formData.email || !formData.email.includes('@')) newErrors.email = t('form.placeholders.email');
        if (!formData.projectName) newErrors.projectName = t('form.placeholders.projectName');
        if (!date) newErrors.date = t('form.placeholders.date');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            addRequestDemo({
                ...formData,
                createdAt: formatter.format(new Date()),
            });
            toast.success(t('form.onSuccess'));
            setFormData({
                id: '',
                nameOrCompany: '',
                email: '',
                message: '',
                projectName: '',
                date: '',
                createdAt: '',
            });
            onClose();
        } catch (error) {
            console.error('Request demo failed:', error);
            toast.error(t('form.onError'));
        }
    };

    const formatter = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour12: true,
    });

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-background relative w-full max-w-lg rounded-lg border-2 border-black p-6 font-[Helvetica]">
                {/* Close button */}
                <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={onClose}
                    className="absolute top-4 right-4 rounded-full text-black hover:opacity-70"
                >
                    <X className="h-5 w-5" />
                </Button>

                {/* Header */}
                <h2 className="mb-1 text-2xl font-bold tracking-tight uppercase">
                    {t('title')} <span className="underline">{projectName}</span>
                </h2>
                <p className="mb-6 text-sm font-medium text-neutral-700">{t('subtitle')}</p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="nameOrCompany">{t('form.placeholders.nameOrCompany')}</Label>
                        <Input
                            id="nameOrCompany"
                            name="nameOrCompany"
                            value={formData.nameOrCompany}
                            onChange={handleInputChange}
                            className="border-2 border-black focus-visible:ring-0"
                        />
                        {errors.nameOrCompany && <p className="text-sm text-red-600">{errors.nameOrCompany}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('form.placeholders.email')}</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border-2 border-black focus-visible:ring-0"
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="message">{t('form.placeholders.message')}</Label>
                        <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="border-2 border-black focus-visible:ring-0"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="date">{t('form.placeholders.date')}</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start border-2 border-black font-normal',
                                        !date && 'text-muted-foreground',
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? formatter.format(date) : 'Pilih tanggal'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto border-2 border-black bg-white p-0">
                                <Calendar
                                    required
                                    mode="single"
                                    selected={date}
                                    onSelect={(d: Date | undefined) => {
                                        setDate(d);
                                        setFormData((prev) => ({
                                            ...prev,
                                            date: d ? formatter.format(d) : '',
                                        }));
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}
                    </div>

                    <Button type="submit" variant={'limeOutline'} className="font-bold">
                        <Send className="mr-2 h-4 w-4" />
                        {t('form.submit')}
                    </Button>
                </form>
            </div>
        </div>
    );
}
