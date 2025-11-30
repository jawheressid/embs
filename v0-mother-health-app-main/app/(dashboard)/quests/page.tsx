import { redirect } from 'next/navigation';

export default function QuestsRedirect() {
  redirect('/teen-space/quests');
  return null;
}
