import { getAuthUser } from "@/app/lib/auth";
import {
  getCharacterMatchSettings,
  updateCharacterMatchSettings,
} from "@/app/lib/database/settings";
import { User } from "@supabase/supabase-js";

export default async function CharacterMatchSettings({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const authUser = (await getAuthUser()) as User;
  const userSettings = await getCharacterMatchSettings(authUser.id);
  return (
    <>
      <form action={updateCharacterMatchSettings}>
        <p>Choose vocabulary</p>
        <div className="grid gap-2">
          <SettingsCheckBox
            defaultChecked={userSettings.hsk1}
            value="hsk1"
            text="HSK 1"
          />
          <SettingsCheckBox
            defaultChecked={userSettings.hsk2}
            value="hsk2"
            text="HSK 2"
          />
          <SettingsCheckBox
            defaultChecked={userSettings.hsk3}
            value="hsk3"
            text="HSK 3"
          />
          <SettingsCheckBox
            defaultChecked={userSettings.hsk4}
            value="hsk4"
            text="HSK 4"
          />
          <SettingsCheckBox
            defaultChecked={userSettings.hsk5}
            value="hsk5"
            text="HSK 5"
          />
          <SettingsCheckBox
            defaultChecked={userSettings.hsk6}
            value="hsk6"
            text="HSK 6"
          />
        </div>
        <button type="submit">Save</button>
      </form>
      {searchParams?.message && (
        <p className="mt-4 rounded-md bg-light/10 p-4 text-center text-light">
          {searchParams.message}
        </p>
      )}
    </>
  );
}

function SettingsCheckBox({
  value,
  text,
  defaultChecked,
}: {
  value: string;
  text: string;
  defaultChecked: boolean;
}) {
  return (
    <label htmlFor={value} className="flex gap-1">
      <input
        type="checkbox"
        name={value}
        id={value}
        defaultChecked={defaultChecked}
      />
      {text}
    </label>
  );
}
