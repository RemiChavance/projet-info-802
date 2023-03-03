import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';


const uri = 'https://api.chargetrip.io/graphql'; // our GraphQL API
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders({
        'x-client-id': '64021b9185c5c3f0221ae344',
        'x-app-id': '64021b9185c5c3f0221ae346'
      }),
      method: 'POST'
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
