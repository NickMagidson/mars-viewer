import { Header, HeaderContainer, HeaderMenuButton, HeaderMenuItem, HeaderName, HeaderNavigation, HeaderSideNavItems, SideNav, SideNavItems } from "@carbon/react";
// import * as Cesium from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";
// import { useEffect, useState } from 'react';
import { useRef } from "react";
import CesiumViewer from './CesiumView';

function App() {
  // Cesium viewer ref
  const cesiumViewerRef = useRef<any>(null)


  const handleFlyToPerseverance = () => {
    cesiumViewerRef.current?.flyToRover("Perseverance Rover")
  }
  

  const handleFlyToCuriosity = () => {
    cesiumViewerRef.current?.flyToRover("Curiosity Rover")
  }


  // Toggle Nomenclature handler
  const handleToggleNomenclature = () => {
    cesiumViewerRef.current?.toggleNomenclature()
  }


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
              <HeaderMenuItem href="#" onClick={handleFlyToPerseverance}>Perseverance</HeaderMenuItem>
              <HeaderMenuItem href="#" onClick={handleFlyToCuriosity}>Curiosity</HeaderMenuItem>
              <HeaderMenuItem href="#" onClick={handleToggleNomenclature}>Toggle Nomenclature</HeaderMenuItem>
              {/* <HeaderMenu isActive aria-label="Link 4" menuLinkName="Link 4">
                <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
              </HeaderMenu> */}
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
                <HeaderMenuItem onClick={handleFlyToPerseverance}>
                  Fly to Perseverance
                </HeaderMenuItem>
                <HeaderMenuItem onClick={handleFlyToCuriosity}>
                  Fly to Curiosity
                </HeaderMenuItem>
                <HeaderMenuItem onClick={handleToggleNomenclature}>
                  Toggle Nomenclature
                </HeaderMenuItem>
              </HeaderSideNavItems>
            </SideNavItems>
            </SideNav>
          </Header>
        </>
      )} />
      <CesiumViewer cesiumViewerRef={cesiumViewerRef} />
    </>
  )
}

export default App
