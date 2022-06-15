export interface ProductDto {
  id: number;
  name: string;
  created: string;
  introduction: string;
  city: string;
  photos: PhotoDto[];
}

export interface PhotoDto {
  id: number;
  url: string;
  isMain: string;
}
