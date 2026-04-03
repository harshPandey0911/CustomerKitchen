import { APP_NAME } from '../../constants/branding';

export default function About() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{`About ${APP_NAME}`}</h1>
        <p className="mt-2 text-gray-500">
          {`${APP_NAME} is a smart appliance platform where users can explore, purchase, and manage kitchen appliances easily.`}
        </p>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p>Version: 1.0.0</p>
        <p>Developed for learning &amp; project purpose</p>
      </div>
    </div>
  );
}
