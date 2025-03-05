export interface UserInter {
    id: number,
    date: string
    name: string,
    province?: string,
    city?: string
    address?: string
    zip?: number
}


export type Users = UserInter[]