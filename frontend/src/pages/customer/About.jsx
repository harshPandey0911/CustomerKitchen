import { APP_NAME } from '../../constants/branding';

export default function About() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="customer-heading text-xl font-semibold">{`About ${APP_NAME}`}</h1>
        <p className="customer-subheading mt-2">
          {`${APP_NAME} is a smart appliance platform where users can explore, purchase, and manage kitchen appliances easily.`}
        </p>
      </div>

      <div className="customer-surface rounded-2xl p-5">
        <p className="customer-heading font-semibold">Version: 1.0.0</p>
        <p className="customer-subheading mt-1 text-sm">Developed for learning &amp; project purpose</p>
      </div>
    </div>
  );
}
