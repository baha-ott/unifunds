// component
import BtnPrimary from "../shared-components/btn-primary";
// icon
import SpinnerBtn from "../shared-components/spinnerBtn";

interface Props {
  state: "" | "loading" | "submitted";
  title: string;
  loadingTitle: string;
}

function BtnFormSubmit({ state = "", title, loadingTitle }: Props) {
  return (
    <BtnPrimary type="submit" disabled={state === "loading"} className="w-full">
      {state === "loading" ? <SpinnerBtn title={loadingTitle} /> : title}
    </BtnPrimary>
  );
}

export default BtnFormSubmit;
