import React, { useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

import LandingView from './LandingView';
import { ViewType, VIEWS_REGISTRY } from './componentsConfig';
import { useTransitionAnimation } from './hooks/useTransitionAnimation';

function RootNavigator() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const { fadeAnim, slideAnim, animateTransition } = useTransitionAnimation();

  const navigateTo = (view: ViewType) => {
    const direction = view === 'landing' ? 'backward' : 'forward';
    animateTransition(() => setCurrentView(view), direction);
  };

  const renderView = () => {
    if (currentView === 'landing') {
      return <LandingView onNavigate={navigateTo} />;
    }

    const ViewComponent = VIEWS_REGISTRY[currentView];
    return <ViewComponent onBack={() => navigateTo('landing')} />;
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      {renderView()}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootNavigator;
