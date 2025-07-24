export interface ArticleArgs {
  id: number;
}

export interface SearchArgs {
  keyword: string;
}

export interface CreateArticleArgs {
  title: string;
  body: string;
  imageUrl: string;
  author: string;
}

export interface UpdateArticleArgs extends Partial<CreateArticleArgs> {
  id: number;
}

export interface DeleteArticleArgs {
  id: number;
}
