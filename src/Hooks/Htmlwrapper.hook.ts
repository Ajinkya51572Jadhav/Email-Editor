import { useContext } from 'react';
import { HtmlContext } from '../Context/Htmlwrapper.context';

export const useHtmlWrapper = () => {
  const htmlContext = useContext(HtmlContext);
  console.log("htmlContext",htmlContext)

  return htmlContext as unknown as {
    activeHover: any;
    setActiveHover: (id: string) => void;
    active: any;
    setActive: (args: any) => void;
    id: any;
    setId: (prev?: any) => void;
    getId: () => number;
  };
};
