import { Header, HeaderContainer, HeaderMenu, HeaderMenuButton, HeaderMenuItem, HeaderName, HeaderNavigation, HeaderSideNavItems, SideNav, SideNavItems } from "@carbon/react";
// import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
// import { useEffect, useState } from 'react';
import CesiumViewer from './CesiumView';

function App() {
  // const [roverLocation, setRoverLocation] = useState<any>(null);
  // const [selectedRover, setSelectedRover] = useState<string>(null);

  // This fetches on mount. Import would be different wiht direct cesium
  // useEffect(() => {
    
  //   const roverData = Cesium.GeoJsonDataSource.load('../public/data/roverPosition.geojson');
  //   setRoverLocation(roverData);

  // }, []);

  // console.log('Rover Location on mount:', roverLocation);


  return (
    <>
      <HeaderContainer render={({
        isSideNavExpanded,
        onClickSideNavExpand
      }) => (
        <>
          <Header aria-label="Mars Viewer">
            {/* <SkipToContent /> */}
            <HeaderMenuButton 
              aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'} 
              onClick={onClickSideNavExpand} 
              isActive={isSideNavExpanded} 
              aria-expanded={isSideNavExpanded} 
            />
            <HeaderName prefix="">
              Mars Viewer
            </HeaderName>
            <HeaderNavigation aria-label="Mars Viewer Navigation">
              <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
              <HeaderMenu isActive aria-label="Link 4" menuLinkName="Link 4">
                <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
              </HeaderMenu>
            </HeaderNavigation>
            {/* <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="Search" onClick={action('search click')}>
                <Search size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="Notifications" onClick={action('notification click')}>
                <Notification size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="App Switcher" onClick={action('app-switcher click')} tooltipAlignment="end">
                <SwitcherIcon size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar> */}
            <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isPersistent={false} onSideNavBlur={onClickSideNavExpand}>
              <SideNavItems>
                <HeaderSideNavItems>
                  <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                  <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                    <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                  </HeaderMenu>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>
        </>
      )} />
      
      <CesiumViewer />
    </>
  )
}

export default App
