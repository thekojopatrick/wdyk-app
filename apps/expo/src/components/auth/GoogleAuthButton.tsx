import * as Linking from "expo-linking";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";

import { Button, Text } from "@/ui";

import { Google } from "@/ui/icons";
import { makeRedirectUri } from "expo-auth-session";
import { supabase } from "@/utils/supabase";

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();
console.log({ redirectTo });

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo,
  );

  if (res.type === "success") {
    const { url } = res;
    console.log(`successUrl:${url}`);
    await createSessionFromUrl(url);
  }
};

export default function GoogleAuthButton() {
  // Handle linking into app from email app.
  const url = Linking.useURL();
  console.log({ url });

  if (url) createSessionFromUrl(url);
  return (
    <Button variant="outline" onPress={performOAuth} className="gap-3">
      <Google width={20} height={20} />
      <Text>Continue with Google</Text>
    </Button>
  );
}

const styles = {
  button:
    "items-center gap-4 justify-center rounded-full p-4 border  border-charcoal-100 flex-row",
  buttonText: "text-lg font-semibold text-center",
};
