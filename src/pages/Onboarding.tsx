import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import Step1Profile from "../components/Step1Profile";
import Step2Songs from "../components/Step2Songs";
import Step3Payment from "../components/Step3Payment";
import Step4Success from "../components/Step4Success";
import { complete, goToStep } from "../redux/onboardingSlice";

const Onboarding = () => {
  const currentStep = useSelector((state: RootState) => state.onboarding.currentStep);
  const dispatch = useDispatch();

  const next = () => dispatch(goToStep(currentStep + 1));
  const prev = () => dispatch(goToStep(Math.max(1, currentStep - 1)));
  const finish = () => {
    dispatch(complete());
  };

  return (
    <div>
      {currentStep === 1 && <Step1Profile onNext={next} />}
      {currentStep === 2 && <Step2Songs onNext={next} onPrev={prev} />}
      {currentStep === 3 && <Step3Payment onNext={finish} onPrev={prev} />}
      {currentStep === 4 && <Step4Success />}
    </div>
  );
};

export default Onboarding;
