import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router'
import {
  TermsAgreementList,
  TermsButtonGroup,
  useSignupStepActions,
  useTermsAgreement,
} from '@/features/sign-up'
import { PrimaryButton, SectionHeader, StepProgressBar } from '@/shared/ui'
import { Layout } from '@/widgets'

const SignupStepOnePage = () => {
  const navigate = useNavigate()

  const { completeStep1 } = useSignupStepActions()
  const { checkedTerms, toggleCheck, agreeAll, isAllAgreed } = useTermsAgreement()

  const onSubmit = () => {
    if (isAllAgreed) {
      completeStep1()
      navigate(ROUTES.SIGN_UP_STEP_TWO)
    }
  }

  return (
    <Layout hasPadding>
      <section>
        <SectionHeader title="SIGN UP" />
        <StepProgressBar currentStep={1} totalSteps={2} label="이용약관에 동의해주세요." />

        <TermsAgreementList checkedTerms={checkedTerms} onToggle={toggleCheck} />
        <TermsButtonGroup checkedTerms={checkedTerms} onToggleAllTerms={agreeAll} />

        <p className="font-page-description mt-10">
          회원가입 이후에도 마이페이지에서 약관을 다시 확인할 수 있습니다.
        </p>

        <PrimaryButton
          direction="right"
          className="mt-5 ml-auto"
          onClick={onSubmit}
          disabled={!isAllAgreed}
        >
          다음 단계
        </PrimaryButton>
      </section>
    </Layout>
  )
}

export default SignupStepOnePage
