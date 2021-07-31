export type Task = {
  id:string
  name:string
  memo:string
  is_done:boolean
  is_star:boolean
  start_date:string|null
  due_date:string|null
  taskSection:string|null
  taskFolder:string
  person:string
  updated_at:string
  created_at:string
}