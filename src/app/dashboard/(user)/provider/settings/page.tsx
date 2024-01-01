import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form-no-avatar";
import ProviderForm from "./components/provider-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          We will use your profile information to identify you make sure that
          the data you enter here is equal to formal documents
        </p>
      </div>
      <Separator />
      <ProviderForm />
    </div>
  );
}
