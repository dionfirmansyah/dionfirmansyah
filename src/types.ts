export interface ProjectDescription {
  id: string;
  [key: string]: string | number | boolean | null | undefined; // Untuk properti lain yang mungkin ada
}

export interface ProjectTechnology {
  id: string;
  name?: string;
  title?: string;
  [key: string]: string | number | boolean | null | undefined; // Untuk properti lain yang mungkin ada
}

export interface ProjectImageFile {
  id: string;
  url?: string;
  [key: string]: string | number | boolean | null | undefined; // Untuk properti lain yang mungkin ada
}

export interface ProjectImage {
  id: string;
  isShowcase?: boolean;
  $files: ProjectImageFile[];
  [key: string]: string | number | boolean | null | undefined | ProjectImageFile[]; // Untuk properti lain yang mungkin ada
}

export interface Project {
  id: string;
  title?: string;
  name?: string;
  category?: string;
  type?: string;
  client?: string;
  company?: string;
  year?: string;
  createdAt?: string;
  descriptions?: ProjectDescription[];
  description?: string;
  technologies: ProjectTechnology[];
  images: ProjectImage[];
  showcaseImages: ProjectImageFile[];
  liveUrl?: string;
  website?: string;
  githubUrl?: string;
  repository?: string;
  [key: string]: string | number | boolean | null | undefined | ProjectDescription[] | ProjectTechnology[] | ProjectImage[] | ProjectImageFile[]; // Untuk properti lain yang mungkin ada
}