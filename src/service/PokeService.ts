import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPokeData, IPokeDetailed, IType, ITypeData} from "../models/IPoke";

export const pokeAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2'}),
    tagTypes: ['Poke'],
    endpoints: (build) => ({
        fetchAllPoke: build.query<IPokeData, {limit: number, offset: number}>({
            query: (params) => ({
                url: `/pokemon`,
                params: {
                    limit: params.limit,
                    offset: params.offset
                }
            }),
            providesTags: result => ['Poke']
        }),
        getPokeByName: build.query<IPokeDetailed, string>({
           query: (pokeName: string) => ({
               url: `/pokemon/${pokeName}`,
               method: 'GET'
           })
        }),
        getPokeTypeList: build.query<ITypeData, []>({
            query: () => ({
                url: 'type',
                method: 'GET'
            })
        }),
        getSortedPoke: build.query<string, any>({
            query: (type: string) => ({
                url: `/type/${type}`,
                method: 'GET'
            })
        })
    })
})