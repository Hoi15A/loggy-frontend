export interface Server {
  readonly id: number
  readonly serverDescription: string
  readonly image: string
  readonly logDirectory: string
  readonly logServiceLocation: string
  readonly serverName: string
  readonly logConfig: string
}