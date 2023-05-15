export type User = {
    id: string,
    username: string,
    password: string,
    co2Score: number
}
//export type User = Omit<MongoUser, "password">