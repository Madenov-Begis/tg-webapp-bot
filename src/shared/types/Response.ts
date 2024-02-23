export interface ResponseWithPagination<T> {
  data: T
  count: number
  current_page: number
  last_page: number
  next_page: number
  prev_page: number | null
}

