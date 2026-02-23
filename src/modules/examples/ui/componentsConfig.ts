import { ComponentType } from 'react';

import TextsView from './TextsView';
import ButtonsView from './ButtonsView';
import TextInputsView from './TextInputsView';
import CardsView from './CardsView';
import CheckboxesView from './CheckboxesView';
import ModalsView from './ModalsView';

export type ViewType =
  | 'landing'
  | 'texts'
  | 'buttons'
  | 'textinputs'
  | 'cards'
  | 'checkboxes'
  | 'modals';

export interface ComponentConfig {
  title: string;
  description: string;
  icon: string;
  color: string;
  view: Exclude<ViewType, 'landing'>;
}

export interface ViewProps {
  onBack: () => void;
}

export const COMPONENTS_CONFIG: ComponentConfig[] = [
  {
    title: 'Text',
    description: 'Typography system with variants, colors & styles',
    icon: 'Aa',
    color: '#3B82F6',
    view: 'texts',
  },
  {
    title: 'Button',
    description: 'Interactive buttons with multiple states & sizes',
    icon: '▢',
    color: '#10B981',
    view: 'buttons',
  },
  {
    title: 'TextInput',
    description: 'Form inputs with validation & icons support',
    icon: '✎',
    color: '#8B5CF6',
    view: 'textinputs',
  },
  {
    title: 'Card',
    description: 'Container component with variants & interactive mode',
    icon: '▣',
    color: '#F59E0B',
    view: 'cards',
  },
  {
    title: 'Checkbox',
    description: 'Selectable control with variants and states',
    icon: '☑',
    color: '#14B8A6',
    view: 'checkboxes',
  },
  {
    title: 'Modal',
    description: 'Overlays for dialogs and confirmations',
    icon: '▧',
    color: '#6366F1',
    view: 'modals',
  },
];

export const VIEWS_REGISTRY: Record<
  Exclude<ViewType, 'landing'>,
  ComponentType<ViewProps>
> = {
  texts: TextsView,
  buttons: ButtonsView,
  textinputs: TextInputsView,
  cards: CardsView,
  checkboxes: CheckboxesView,
  modals: ModalsView,
};
