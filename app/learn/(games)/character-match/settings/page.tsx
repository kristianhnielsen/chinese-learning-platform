import { getAuthUser } from "@/app/lib/auth";
import {
  getCharacterMatchSettings,
  updateCharacterMatchSettings,
} from "@/app/lib/database/settings";
import { User } from "@supabase/supabase-js";
import { twJoin, twMerge } from "tailwind-merge";

export default async function CharacterMatchSettings({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const authUser = (await getAuthUser()) as User;
  const userSettings = await getCharacterMatchSettings(authUser.id);
  return (
    <>
      <form action={updateCharacterMatchSettings} className="grid gap-4">
        <h1 className="text-2xl text-primary">Vocabulary settings</h1>
        <div className="grid justify-center gap-2">
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
        <button
          type="submit"
          className="mb-2 flex w-full items-center justify-center gap-4 rounded-md border border-light/20 bg-green-700 px-4 py-2 transition-all"
        >
          Save
        </button>
      </form>
      {searchParams?.message && (
        <p
          className={twJoin(
            "mt-4 rounded-md bg-light/10 p-4 text-center text-light",
            searchParams.message === "Please select at least one" &&
              "bg-red-500/50",
          )}
        >
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
