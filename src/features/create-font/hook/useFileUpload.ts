import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

/**
 * 파일 업로드 핸들링을 위한 커스텀 훅
 *
 * - createFont 스토어에 파일을 반영하고, 업로드 상태를 추적
 *
 * @param section react-hook-form 파일 업로드 섹션 이름
 * @returns file (업로드 된 파일), isLoading (업로드 중 여부), handleFileChange (파일 변경 핸들러)
 */

export const useFileUpload = (section: string) => {
  const { setValue } = useFormContext()

  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0] || null
    setIsLoading(true)

    try {
      if (!currentFile) {
        setValue(section, null)
        toast.error('파일 선택이 취소되었습니다')
        return
      }

      setValue(section, currentFile)
      toast.success('파일이 업로드되었습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleFileChange }
}
