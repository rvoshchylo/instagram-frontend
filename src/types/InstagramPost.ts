export interface InstagramComment {
  id: string;
  text: string;
  timestamp: string;
}

export interface InstagramPost {
  id: string;
  caption?: string;
  like_count: number;
  comments_count: number;
  permalink: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  timestamp: string;
  comments?: InstagramComment[];
}
