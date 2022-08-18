export interface PostProps {
  _id?: string
  title: string
  author: {
    name: string
    image: string
  }
  description: string
  mainImage: {
    assest: {
      url: string
    }
  }
  slug: {
    current: string
  }
}

export interface Post extends PostProps {
  _createdAt: string,
  body: object[],
  comment: Comment[];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updateAt: string;
}
