import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 翻译资源
const resources = {
  zh: {
    common: {
      navigation: {
        home: "首页",
        login: "登录", 
        register: "注册",
        websocket_demo: "WebSocket 演示",
        market: "行情",
        wealth: "理财",
        assets: "资产"
      },
      language: {
        chinese: "中文",
        english: "English", 
        japanese: "日本語",
        select_language: "选择语言"
      },
      auth: {
        login: "登录",
        register: "注册",
        username: "用户名",
        password: "密码",
        confirm_password: "确认密码",
        email: "邮箱",
        submit: "提交",
        already_have_account: "已有账户？",
        no_account: "没有账户？",
        create_account: "创建账户",
        name_placeholder: "请输入您的姓名",
        email_or_phone: "邮箱或手机号",
        email_or_phone_placeholder: "请输入邮箱或手机号",
        password_placeholder: "8-16位，包含数字和字母",
        password_requirements: "密码需要8-16位，同时包含数字和字母",
        confirm_password_placeholder: "请再次输入密码",
        password_placeholder_simple: "请输入密码",
        registering: "注册中...",
        logging_in: "登录中...",
        register_now: "立即注册",
        login_now: "立即登录"
      },
      validation: {
        email_required: "邮箱不能为空",
        email_invalid: "请输入有效的邮箱地址",
        phone_required: "手机号不能为空",
        phone_invalid: "请输入有效的手机号码",
        identifier_required: "请输入邮箱或手机号",
        password_required: "密码不能为空",
        password_length: "密码长度必须为8-16位",
        password_number: "密码必须包含至少一个数字",
        password_letter: "密码必须包含至少一个字母",
        confirm_password_required: "请确认密码",
        passwords_not_match: "两次输入的密码不一致",
        name_required: "姓名不能为空",
        name_min_length: "姓名至少需要2个字符",
        login_failed: "登录失败",
        register_failed: "注册失败"
      },
      websocket: {
        title: "WebSocket 演示",
        url_label: "WebSocket URL",
        connect: "连接",
        disconnect: "断开连接",
        reconnect: "重连",
        connection_status: "连接状态",
        connection_code: "连接状态码",
        event_listeners: "事件监听器",
        last_message: "最后消息",
        none: "无",
        connected: "已连接",
        disconnected: "未连接",
        connecting: "连接中",
        send_message: "发送消息",
        message_type: "消息类型",
        message_content: "消息内容",
        message_placeholder: "输入消息内容...",
        send: "发送",
        message_history: "消息历史",
        clear_messages: "清空消息",
        connection_info: "连接信息",
        connection_established: "连接已建立",
        connection_closed: "连接已关闭",
        connection_error: "连接发生错误",
        received_chat: "收到聊天消息:",
        received_notification: "收到通知:",
        chat: "聊天",
        notification: "通知", 
        command: "命令",
        custom: "自定义",
        no_messages: "暂无消息"
      },
      common: {
        welcome: "欢迎",
        welcome_back: "欢迎回来!",
        welcome_message: "一个简洁优雅的应用体验",
        start_journey: "开始您的美好体验之旅",
        logout: "退出登录",
        name: "姓名",
        email: "邮箱", 
        phone: "手机",
        loading: "加载中...",
        error: "错误",
        success: "成功",
        cancel: "取消",
        confirm: "确认",
        save: "保存"
      },
      error: {
        page_not_found: "页面未找到",
        page_not_found_description: "抱歉，您访问的页面不存在或已被移除。",
        something_went_wrong: "出现了一些问题",
        error_description: "抱歉，应用程序遇到了意外错误。我们正在努力解决这个问题。",
        back_to_home: "返回首页",
        go_back: "返回上一页",
        try_again: "重新尝试",
        need_help: "如果问题持续存在，请联系技术支持。",
        persistent_problem: "如果问题持续存在，请刷新页面或联系技术支持。",
        error_details: "错误详情"
      }
    }
  },
  en: {
    common: {
      navigation: {
        home: "Home",
        login: "Login",
        register: "Register", 
        websocket_demo: "WebSocket Demo",
        market: "Market",
        wealth: "Wealth",
        assets: "Assets"
      },
      language: {
        chinese: "中文",
        english: "English",
        japanese: "日本語", 
        select_language: "Select Language"
      },
      auth: {
        login: "Login",
        register: "Register",
        username: "Username",
        password: "Password",
        confirm_password: "Confirm Password",
        email: "Email",
        submit: "Submit",
        already_have_account: "Already have an account?",
        no_account: "Don't have an account?",
        create_account: "Create Account",
        name_placeholder: "Please enter your name",
        email_or_phone: "Email or Phone",
        email_or_phone_placeholder: "Please enter email or phone",
        password_placeholder: "8-16 characters, including numbers and letters",
        password_requirements: "Password must be 8-16 characters and contain both numbers and letters",
        confirm_password_placeholder: "Please enter password again",
        password_placeholder_simple: "Please enter password",
        registering: "Registering...",
        logging_in: "Logging in...",
        register_now: "Register Now",
        login_now: "Login Now"
      },
      validation: {
        email_required: "Email is required",
        email_invalid: "Please enter a valid email address",
        phone_required: "Phone number is required",
        phone_invalid: "Please enter a valid phone number",
        identifier_required: "Please enter email or phone",
        password_required: "Password is required",
        password_length: "Password must be 8-16 characters",
        password_number: "Password must contain at least one number",
        password_letter: "Password must contain at least one letter",
        confirm_password_required: "Please confirm password",
        passwords_not_match: "Passwords do not match",
        name_required: "Name is required",
        name_min_length: "Name must be at least 2 characters",
        login_failed: "Login failed",
        register_failed: "Registration failed"
      },
      websocket: {
        title: "WebSocket Demo",
        url_label: "WebSocket URL",
        connect: "Connect",
        disconnect: "Disconnect",
        reconnect: "Reconnect",
        connection_status: "Connection Status",
        connection_code: "Connection Code",
        event_listeners: "Event Listeners",
        last_message: "Last Message",
        none: "None",
        connected: "Connected",
        disconnected: "Disconnected",
        connecting: "Connecting",
        send_message: "Send Message",
        message_type: "Message Type",
        message_content: "Message Content",
        message_placeholder: "Enter message content...",
        send: "Send",
        message_history: "Message History",
        clear_messages: "Clear Messages",
        connection_info: "Connection Info",
        connection_established: "Connection established",
        connection_closed: "Connection closed",
        connection_error: "Connection error occurred",
        received_chat: "Received chat message:",
        received_notification: "Received notification:",
        chat: "Chat",
        notification: "Notification",
        command: "Command",
        custom: "Custom",
        no_messages: "No messages"
      },
      common: {
        welcome: "Welcome",
        welcome_back: "Welcome Back!",
        welcome_message: "A clean and elegant application experience",
        start_journey: "Start your wonderful journey",
        logout: "Logout",
        name: "Name",
        email: "Email",
        phone: "Phone", 
        loading: "Loading...",
        error: "Error",
        success: "Success",
        cancel: "Cancel",
        confirm: "Confirm",
        save: "Save"
      },
      error: {
        page_not_found: "Page Not Found",
        page_not_found_description: "Sorry, the page you are looking for does not exist or has been removed.",
        something_went_wrong: "Something Went Wrong",
        error_description: "Sorry, the application encountered an unexpected error. We are working to resolve this issue.",
        back_to_home: "Back to Home",
        go_back: "Go Back",
        try_again: "Try Again",
        need_help: "If the problem persists, please contact technical support.",
        persistent_problem: "If the problem persists, please refresh the page or contact technical support.",
        error_details: "Error Details"
      }
    }
  },
  ja: {
    common: {
      navigation: {
        home: "ホーム",
        login: "ログイン",
        register: "登録",
        websocket_demo: "WebSocket デモ",
        market: "相場",
        wealth: "資産運用",
        assets: "資産"
      },
      language: {
        chinese: "中文",
        english: "English",
        japanese: "日本語",
        select_language: "言語を選択"
      },
      auth: {
        login: "ログイン",
        register: "登録", 
        username: "ユーザー名",
        password: "パスワード",
        confirm_password: "パスワード確認",
        email: "メール",
        submit: "送信",
        already_have_account: "アカウントをお持ちですか？",
        no_account: "アカウントをお持ちでないですか？",
        create_account: "アカウント作成",
        name_placeholder: "お名前を入力してください",
        email_or_phone: "メールまたは電話番号",
        email_or_phone_placeholder: "メールまたは電話番号を入力してください",
        password_placeholder: "8-16文字、数字と文字を含む",
        password_requirements: "パスワードは8-16文字で、数字と文字の両方を含む必要があります",
        confirm_password_placeholder: "パスワードを再入力してください",
        password_placeholder_simple: "パスワードを入力してください",
        registering: "登録中...",
        logging_in: "ログイン中...",
        register_now: "今すぐ登録",
        login_now: "今すぐログイン"
      },
      validation: {
        email_required: "メールアドレスが必要です",
        email_invalid: "有効なメールアドレスを入力してください",
        phone_required: "電話番号が必要です",
        phone_invalid: "有効な電話番号を入力してください",
        identifier_required: "メールまたは電話番号を入力してください",
        password_required: "パスワードが必要です",
        password_length: "パスワードは8-16文字である必要があります",
        password_number: "パスワードには少なくとも1つの数字が必要です",
        password_letter: "パスワードには少なくとも1つの文字が必要です",
        confirm_password_required: "パスワードを確認してください",
        passwords_not_match: "パスワードが一致しません",
        name_required: "名前が必要です",
        name_min_length: "名前は少なくとも2文字である必要があります",
        login_failed: "ログインに失敗しました",
        register_failed: "登録に失敗しました"
      },
      websocket: {
        title: "WebSocket デモ",
        url_label: "WebSocket URL",
        connect: "接続",
        disconnect: "切断",
        reconnect: "再接続",
        connection_status: "接続状態",
        connection_code: "接続状態コード",
        event_listeners: "イベントリスナー",
        last_message: "最後のメッセージ",
        none: "なし",
        connected: "接続済み",
        disconnected: "未接続",
        connecting: "接続中",
        send_message: "メッセージを送信",
        message_type: "メッセージタイプ",
        message_content: "メッセージ内容",
        message_placeholder: "メッセージ内容を入力...",
        send: "送信",
        message_history: "メッセージ履歴",
        clear_messages: "メッセージをクリア",
        connection_info: "接続情報",
        connection_established: "接続が確立されました",
        connection_closed: "接続が閉じられました",
        connection_error: "接続エラーが発生しました",
        received_chat: "チャットメッセージを受信:",
        received_notification: "通知を受信:",
        chat: "チャット",
        notification: "通知",
        command: "コマンド",
        custom: "カスタム",
        no_messages: "メッセージなし"
      },
      common: {
        welcome: "ようこそ",
        welcome_back: "おかえりなさい！",
        welcome_message: "シンプルでエレガントなアプリ体験",
        start_journey: "素晴らしい体験の旅を始めましょう",
        logout: "ログアウト",
        name: "名前",
        email: "メール",
        phone: "電話",
        loading: "読み込み中...",
        error: "エラー", 
        success: "成功",
        cancel: "キャンセル",
        confirm: "確認",
        save: "保存"
      },
      error: {
        page_not_found: "ページが見つかりません",
        page_not_found_description: "申し訳ございませんが、お探しのページは存在しないか削除されました。",
        something_went_wrong: "問題が発生しました",
        error_description: "申し訳ございませんが、アプリケーションで予期しないエラーが発生しました。この問題の解決に取り組んでいます。",
        back_to_home: "ホームに戻る",
        go_back: "戻る",
        try_again: "再試行",
        need_help: "問題が続く場合は、技術サポートにお問い合わせください。",
        persistent_problem: "問題が続く場合は、ページを更新するか技術サポートにお問い合わせください。",
        error_details: "エラー詳細"
      }
    }
  }
};

// 获取保存的语言设置，如果在浏览器环境中
const getStoredLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'zh';
  }
  return 'zh';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(), // 使用保存的语言设置
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common'],
    defaultNS: 'common',
  });

export default i18n;
