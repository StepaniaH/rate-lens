import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // 纯前端项目：仅控制台输出，不上报
    console.error('RateLens ErrorBoundary:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          <h2 className="text-lg font-semibold text-red">出错了</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            应用遇到意外错误。可以尝试重置后继续使用。
          </p>
          {this.state.message && (
            <pre className="mt-3 overflow-x-auto rounded-md bg-surface/40 px-3 py-2 text-left text-xs text-faint">
              {this.state.message}
            </pre>
          )}
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-4 rounded-md bg-blue px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            重置
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
