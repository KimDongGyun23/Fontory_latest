import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { PreviewFont, PreviewFontList } from '../model/font.model'
import { FontProgressListModel } from '../model/fontProgress.model'
import type { FontFilter } from '../types/font.type'

import { fontQueryKeys } from './fontQueryKeys'
import { FontService } from './FontService'

export const useBookmarkFontList = (filter: FontFilter) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.bookmark(filter),
    queryFn: () => FontService.getBookmark(filter),
    select: (data) => new PreviewFontList(data),
  })
}

export const useFontDownload = (fontId: number) => {
  return useQuery({
    queryKey: fontQueryKeys.download(fontId),
    queryFn: () => FontService.getDownload(fontId),
    enabled: false,
  })
}

export const useExploreFontList = (filter: FontFilter) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.explore(filter),
    queryFn: () => FontService.getExplore(filter),
    select: (data) => new PreviewFontList(data),
  })
}

export const useFontDetail = (fontId: number) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.detail(fontId),
    queryFn: () => FontService.getDetail(fontId),
    select: (data) => new PreviewFont(data),
  })
}

export const useRecommendFontList = (fontId: number) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.recommend(fontId),
    queryFn: () => FontService.getRecommend(fontId),
    select: (data) => new PreviewFontList({ content: data, number: 1, totalPages: 1 }),
  })
}

export const usePopularFontList = () => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.popular(),
    queryFn: () => FontService.getPopular(),
    select: (data) => new PreviewFontList({ content: data, number: 1, totalPages: 1 }),
    staleTime: 60000,
    gcTime: 60000 * 5,
  })
}

export const useProgressFontList = () => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.inProgress(),
    queryFn: () => FontService.getInProgress(),
    select: (data) => new FontProgressListModel(data),
    staleTime: 60000,
    gcTime: 60000 * 5,
  })
}

export const useCompletedFontList = (page: number) => {
  return useSuspenseQuery({
    queryKey: fontQueryKeys.complete(page),
    queryFn: () => FontService.getCompleted(page),
    select: (data) => new PreviewFontList(data),
    staleTime: 60000,
    gcTime: 60000 * 5,
  })
}
