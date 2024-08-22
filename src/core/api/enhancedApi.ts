import { baseApi } from './baseApi';

const enhancedApi = baseApi.enhanceEndpoints({
  endpoints: {},
});

export * from './baseApi';

export { enhancedApi };
