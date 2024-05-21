import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '../../constants';
import { pushError } from '../../redux/modules';

type ErrorBoundaryProps = Record<string, unknown>;

type State = {
  hasError: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
const Notification = (): JSX.Element | null => {
  const dispatch = useDispatch();

  dispatch(pushError({ message: 'エラーが発生しました' }));
  return (
    <>
      <Navigate to={RoutePath.TOP} replace />
    </>
  );
};

export class NotificationErrorBoundary extends React.PureComponent<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError = (): object => {
    return { hasError: true };
  };

  componentDidUpdate(_: ErrorBoundaryProps, prevState: State): void {
    const { hasError } = this.state;
    if (!prevState.hasError && hasError) {
      this.setState({ hasError: false });
    }
  }

  render(): JSX.Element {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <Notification />;
    }
    return <>{children}</>;
  }
}
