import { MenuType } from '@/modules/CollapsibleHeader/types';
import { AccountLink } from '@/types/index';
import { useEffect, useState } from 'react';

export const useFetchData = () => {
  // stored fetch data
  const [accountList, setAccountList] = useState<AccountLink[]>();
  const [menuList, setMenuList] = useState<MenuType[]>();
  //   const [projectList, setProjectList] = useState<ProjectInfo[]>();
  //   const [skillList, setSkillList] = useState<Skill[]>();
  //   const [errorData, setErrorData] = useState<object>();
  //   const [isLoadedData, setIsLoadedData] = useState<object>({
  //     account: false,
  //     project: false,
  //     skill: false,
  //   });

  useEffect(() => {
    /**
     * autorun callback to fetch endpoint data
     */
    (function fetchData() {
      fetch('http://localhost:5173/api/accounts')
        .then((response) => response.json())
        .then(
          (response) => {
            const { accounts } = response;
            // setIsLoadedData((prev) => (prev ? { ...prev, account: true } : {}));
            setAccountList(accounts);
          },
          //   (fetchError) => {
          //     setIsLoadedData((prev) => (prev ? { ...prev, account: true } : {}));
          //     setErrorData((prev) => (prev ? { ...prev, account: fetchError } : {}));
          //   },
        );
      fetch('http://localhost:5173/api/menuItems')
        .then((response) => response.json())
        .then((response) => {
          const { menuItems } = response;
          setMenuList(menuItems);
        });
      //   fetch('http://localhost:3000/api/projects')
      //     .then((response) => response.json())
      //     .then(
      //       (response) => {
      //         const { projects } = response;
      //         setIsLoadedData((prev) => (prev ? { ...prev, project: true } : {}));
      //         setProjectList(projects);
      //       },
      //       (fetchError) => {
      //         setIsLoadedData((prev) => (prev ? { ...prev, project: true } : {}));
      //         setErrorData((prev) => (prev ? { ...prev, project: fetchError } : {}));
      //       },
      //     );
      //   fetch('http://localhost:3000/api/skills')
      //     .then((response) => response.json())
      //     .then(
      //       (response) => {
      //         const { skills } = response;
      //         setIsLoadedData((prev) => (prev ? { ...prev, skill: true } : {}));
      //         setSkillList(skills);
      //       },
      //       (fetchError) => {
      //         setIsLoadedData((prev) => (prev ? { ...prev, skill: true } : {}));
      //         setErrorData((prev) => (prev ? { ...prev, skill: fetchError } : {}));
      //       },
      //     );

      // fetch('http://localhost:3000/api/projects/p7LPPA-al-2208/deliverables')
      //   .then((response) => response.json())
      //   .then((response) => console.log(response));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   return { accountList, projectList, skillList, isLoadedData, errorData };
  return { accountList, menuList };
};
