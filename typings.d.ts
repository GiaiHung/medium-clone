export interface PostProps {
  _id: string
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
