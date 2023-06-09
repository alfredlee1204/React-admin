import style from './basePage.module.scss'
type ContainerProps = {
    children: React.ReactNode;
  };
export function BasePage(prop:ContainerProps) {
    
    return <><div className={style["container"]}>{prop.children}</div></>

}