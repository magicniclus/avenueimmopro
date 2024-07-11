/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";

import { getUserInfo, isUserLoggedIn, logOut } from "@/firebase/auth";
import { getDataByRoute } from "@/firebase/database";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  Cog6ToothIcon,
  EnvelopeIcon,
  HomeIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  let userId = searchParams.get("id");

  const [navigation, setNavigation] = useState([
    {
      name: "Tableau de bord",
      href: `/espace-pro/tableau-de-bord`,
      icon: HomeIcon,
      current: false,
    },
    {
      name: "Leads",
      href: `/espace-pro/leads`,
      icon: UserIcon,
      current: false,
    },
    {
      name: "Performances",
      href: `/espace-pro/performances`,
      icon: ArrowTrendingUpIcon,
      current: false,
    },
    {
      name: "Contact",
      href: `/espace-pro/contact`,
      icon: EnvelopeIcon,
      current: false,
    },
  ]);

  const updateUrlsWithId = (id: string) => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        href: `${item.href.split("?")[0]}?id=${id}`,
      }))
    );
  };

  const updateCurrentNavigation = (currentPath: string) => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        current: item.href.split("?")[0] === currentPath,
      }))
    );
  };

  const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#", onClick: () => handleSignOut() },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [letters, setLetters] = useState<string>("");
  const [idIsOk, setIdIsOk] = useState(false);

  useEffect(() => {
    const currentPath = pathName.split("?")[0];
    updateCurrentNavigation(currentPath);
  }, [pathName]);

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/"); // Redirection après la déconnexion
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const loggedIn = await isUserLoggedIn();
      if (!loggedIn) {
        setIsLoading(false);
        router.push("/espace-pro/connexion");
        return;
      }
    };
    checkUserLoggedIn();
    if (!idIsOk) {
      getUserInfo().then((data) => {
        if (data) {
          userId = data.uid;
          if (!searchParams.get("id")) {
            router.replace(`${pathName}?id=${userId}`);
            updateUrlsWithId(userId);
          }
          getDataByRoute(`agents/${userId}`).then((user) => {
            if (user && user.informations.Abonnement.actif) {
              setIsLoading(false);
              const currentPath = pathName.split("?")[0];
              updateCurrentNavigation(currentPath);
            } else {
              router.push(`/espace-pro/abonnement?id=${userId}`);
            }
          });
        }
        setIdIsOk(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!idIsOk) {
      getUserInfo()
        .then((user) => {
          if (user && user.email) {
            setLetters(user.email);
          } else {
            setLetters("");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setIdIsOk(true);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-white">
        <div className="text-center">
          <img
            src="/favicon.png"
            alt="logo"
            className="animate-pulse w-20 h-20"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <Transition show={sidebarOpen}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/logo-white.png"
                        alt="avenue-immo.fr"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                            onClick={handleSignOut}
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="/logo-white.png"
                alt="avenue-immo.fr"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                    onClick={handleSignOut}
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    Deconnexion
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
              <Menu as="div" className="relative flex items-center">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <div className="text-gray-600">{letters}</div>
                  <span className="hidden lg:flex lg:items-center">
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </MenuButton>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            onClick={
                              item.name === "Sign out"
                                ? handleSignOut
                                : undefined
                            }
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SideBarLayout;
