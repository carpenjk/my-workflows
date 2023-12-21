import {FC, ReactNode, JSX, createContext, useState} from 'react';

export type LoadingConfig = {
  minLoading: number,
  delay: number,
}

type Props = {
  children: ReactNode,
  fallback: JSX.Element,
  initialLoadState: boolean,
  config?: Partial<LoadingConfig>,
};

type LoadingState = {
  isLoading: boolean,
  isComponentMounted: boolean
}

type LoadingContextState = {
  loadingState: LoadingState,
  setComponentLoadingState: React.Dispatch<React.SetStateAction<{
    isLoading: boolean;
    isComponentMounted: boolean;
  }>>,
  fallback: JSX.Element,
  config:  LoadingConfig,
  
}

const DEFAULT_CONFIG = {
  minLoading: 0,
  delay: 0
}

const DefaultFallback = <div></div>;

export const LoadingContext = createContext<LoadingContextState>({
  loadingState: {
    isLoading: true,
    isComponentMounted: false,
  },
  setComponentLoadingState: ()=> {},
  fallback: DefaultFallback,
  config: DEFAULT_CONFIG
});


export const Loading: FC<Props> = (props) => {
  const {
    children,
    config,
    fallback,
    initialLoadState,
  } = props;

  const initialLoadingState = {
    isLoading: initialLoadState,
    isComponentMounted: !initialLoadState,
  }

  const [componentLoadingState, setComponentLoadingState] = useState(initialLoadingState);
  const _config = {...DEFAULT_CONFIG, ...config};

  return (
    <LoadingContext.Provider value={{loadingState: componentLoadingState, fallback, config: _config, setComponentLoadingState}} >
      {children}
    </LoadingContext.Provider>)
}
