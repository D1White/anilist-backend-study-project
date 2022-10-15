export enum ErrorsEnum {
  animeApi = 'An error occurred while requesting anime api',
  animeApiManyReq = 'You are being rate limited by Jikan or MyAnimeList is rate-limiting our servers',
  notFound = 'Not Found',
  dbValidationError = 'Database validation error',
  internalError = 'Internal Error',
  userExists = 'User with this email address already exists',
}
