import {
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const Contact = () => {
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Contactez notre équipe pour toute question ou demande de support.
        </p>
      </div>
      <div className="mx-auto mt-20 max-w-lg space-y-16">
        <div className="flex gap-x-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
            <PhoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Support client téléphonique
            </h3>
            <p className="mt-2 leading-7 text-gray-600">
              Contactez le support pour toute question sur nos produits ou
              services.
            </p>
            <p className="mt-4">
              <a
                href="tel:0968523252"
                className="text-sm font-semibold leading-6 text-blue-600"
              >
                09 68 52 32 52
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
            <ChatBubbleLeftRightIcon
              className="h-6 w-6 text-white"
              aria-hidden="true"
            />
          </div>
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Support après-vente
            </h3>
            <p className="mt-2 leading-7 text-gray-600">
              Contactez le support pour toute question sur nos produits ou
              services.
            </p>
            <p className="mt-4">
              <a
                href="mailto:support@avenue-immo.fr"
                className="text-sm font-semibold leading-6 text-blue-600"
              >
                Contact <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
            <ComputerDesktopIcon
              className="h-6 w-6 text-white"
              aria-hidden="true"
            />
          </div>
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Support technique
            </h3>
            <p className="mt-2 leading-7 text-gray-600">
              Signalez un bug ou un problème technique sur notre site web.
            </p>
            <p className="mt-4">
              <a
                href="mailto:technique@avenue-immo.fr"
                className="text-sm font-semibold leading-6 text-blue-600"
              >
                Reporter un probleme technique{" "}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
