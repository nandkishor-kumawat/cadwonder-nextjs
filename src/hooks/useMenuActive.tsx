import { usePathname } from "next/navigation";

const useMenuActive = (route: any) => {
  const pathname = usePathname();
  return pathname === route;
};

export default useMenuActive;