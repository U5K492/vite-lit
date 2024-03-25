export type itemsJson = itemJson[]

export type itemJson = {
  rendered_body: string
  body: string
  coediting: boolean
  comments_count: number
  created_at: string
  group: string | null
  id: string
  likes_count: number
  private: boolean
  reactions_count: number
  stocks_count: number
  tags: object[]
  title: string
  updated_at: string
  url: string
  user: object
  page_views_count: null
  team_membership: null
  organization_url_name: null
  slide: boolean
}

export type items = item[]

export type item = {
  id: string
  title: string
  url: string
  created_at: string
}