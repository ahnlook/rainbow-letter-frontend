import { useTranslation } from 'react-i18next';

function PetRegistrationSection({ title, subTitle, description, children }) {
  const { t } = useTranslation();

  return (
    <section>
      <div className="solo-medium text-nowrap py-2 font-semibold">
        <span>{t(title)}</span>
        <span className="ml-2 text-gray-2">{t(subTitle)}</span>
      </div>
      {description && (
        <p className="mb-2 text-[14px] text-gray-2">
          (This will be used as the name your baby calls you in their reply.)
        </p>
      )}
      {children}
    </section>
  );
}

export default PetRegistrationSection;
