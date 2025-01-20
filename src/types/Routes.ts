export enum Routes {
  HOME = '/',
  JOKES = '/jokes',
  JOKE = '/jokes/:id',
  COLLECTION = '/collection',
  NOT_FOUND = '/:pathMatch(.*)*',
}
export enum RouteNames {
  HOME = '/',
  JOKES = 'jokes',
  JOKE = 'joke',
  COLLECTION = 'collection',
  NOT_FOUND = 'not-found',
}
