export interface CreateInstagramPost {
  imageUrl: string;
  caption?: string;
  userId: string;
}

export interface InstagramRawPost extends Omit<CreateInstagramPost, 'userId'> {}
