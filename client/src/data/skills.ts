export interface Skill {
  name: string;
  icon: string;
  type: "fab" | "fas" | "svg";
  color: string;
  svgPath?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  iconClass: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "laptop-code",
    iconClass: "text-primary",
    skills: [
      {
        name: "React.js",
        icon: "react",
        type: "fab",
        color: "text-blue-500"
      },
      {
        name: "Vue.js",
        icon: "vuejs",
        type: "fab",
        color: "text-green-500"
      },
      {
        name: "HTML5",
        icon: "html5",
        type: "fab",
        color: "text-orange-500"
      },
      {
        name: "CSS3",
        icon: "css3-alt",
        type: "fab",
        color: "text-blue-500"
      },
      {
        name: "Bootstrap",
        icon: "bootstrap",
        type: "fab",
        color: "text-purple-500"
      },
      {
        name: "Tailwind",
        icon: "tailwind",
        type: "svg",
        color: "text-sky-400",
        svgPath: "M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"
      }
    ]
  },
  {
    title: "Backend Development",
    icon: "server",
    iconClass: "text-accent",
    skills: [
      {
        name: "Node.js",
        icon: "node-js",
        type: "fab",
        color: "text-green-600"
      },
      {
        name: "Express",
        icon: "express",
        type: "svg",
        color: "text-gray-600",
        svgPath: "M32 24.795c-1.164.296-1.884.013-2.53-.957l-4.594-6.356-.664-.88-5.365 7.257c-.613.873-1.256 1.253-2.4.944l6.87-9.222-6.396-8.33c1.1-.214 1.86-.105 2.535.88l4.765 6.435 4.8-6.4c.615-.873 1.276-1.205 2.38-.883l-2.48 3.288-3.36 4.375c-.4.5-.345.842.023 1.325L32 24.795zM.008 15.427l.975-4.55c.33-1.666 2.278-1.975 3.77-1.975 1.698 0 3.44.236 3.44 2.277 0 .94-.192 3.06-3.33 3.06-1.765 0-2.652-.6-2.652-1.63h3.464c.386 0 .7-.295.7-.787 0-.255-.006-.473-.253-.687-.247-.214-.64-.1-.878-.1-1.225 0-1.316.82-1.448 1.473l-.883 4.098c-.33 1.666.53 2.346 2.966 2.346 1.793 0 2.645-.712 3.306-1.655.286.302.6.448.908.44.773-.016 1.554-.776 1.672-1.7l.875-4.056c.243-1.142-.035-2.372-1.41-2.775 1.61-.488 2.187-1.573 2.43-2.715l.123-.56c.492-2.307-.406-3.957-3.85-3.957-3.458 0-4.612 1.65-5.103 3.957l-.128.56c-.245 1.142.118 2.227 1.028 2.715-1.31.488-2.052 1.625-2.293 2.767v.008h.002zm3.92-10.44l.217-.977C4.38 2.984 4.91 2.51 6.88 2.51s2.4.47 2.165 1.495l-.217.977c-.236 1.07-.752 1.495-2.72 1.495s-2.425-.43-2.18-1.494z"
      },
      {
        name: "MongoDB",
        icon: "mongodb",
        type: "svg",
        color: "text-green-500",
        svgPath: "M15.9.087l.854 1.604c.192.296.4.558.645.802.715.715 1.394 1.464 2.004 2.266 1.447 1.9 2.423 4.01 3.12 6.292.418 1.394.645 2.824.662 4.27.07 4.323-1.412 8.035-4.4 11.12-.488.488-1.01.94-1.57 1.342-.296 0-.436-.227-.558-.436-.227-.383-.366-.82-.436-1.255-.105-.523-.174-1.046-.14-1.586v-.244C16.057 24.21 15.796.21 15.9.087z M15.9.034c-.035-.07-.07-.017-.105.017.017.35-.105 16.304-.105 16.304C15.67 16.304 15.9.034 15.9.034z M16.754 28.845c.035-.4.227-.732.436-1.063-.21-.087-.366-.26-.488-.453-.105-.174-.192-.383-.26-.575-.244-.732-.296-1.5-.366-2.248v-.453c-.087.07-.105.661-.105.661-.017.35-.035.7-.07 1.046l-.105.625c-.052.26-.07.558-.17.81-.14.383-.122.732-.105 1.128.017.296.105.558.21.82.017.052.035.07.07.105.297.026.488.07.767.07.28-.35.436-.227.536-.436z"
      }
    ]
  },
  {
    title: "Mobile Development",
    icon: "mobile-alt",
    iconClass: "text-secondary",
    skills: [
      {
        name: "React Native",
        icon: "react",
        type: "fab",
        color: "text-blue-500"
      },
      {
        name: "Capacitor",
        icon: "capacitor",
        type: "svg",
        color: "text-blue-400",
        svgPath: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.5 4.8c-.53 0-1.048.107-1.55.327a.5.5 0 10.4.917c.403-.175.815-.267 1.25-.267 1.38 0 2.5 1.12 2.5 2.5a.5.5 0 001 0c0-1.933-1.567-3.5-3.5-3.5zm.4 8.7c-.53 0-1.048-.107-1.55-.327a.5.5 0 10-.4.917c.403.175.815.267 1.25.267 1.38 0 2.5-1.12 2.5-2.5a.5.5 0 00-1 0c0 .827-.673 1.5-1.5 1.5z"
      }
    ]
  },
  {
    title: "Other Technologies",
    icon: "tools",
    iconClass: "text-yellow-600",
    skills: [
      {
        name: "Redux",
        icon: "redux",
        type: "svg",
        color: "text-purple-600",
        svgPath: "M16.633 16.504c.869-.075 1.543-.84 1.499-1.754-.046-.914-.795-1.648-1.708-1.648h-.061c-.943.031-1.678.824-1.648 1.769.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.004 4.795-1.603.838-3.296 1.154-4.944.929-1.378-.194-2.456-.81-3.116-1.798-.988-1.499-1.078-3.116-.255-4.734.6-1.17 1.499-2.023 2.099-2.443-.238-.435-.569-1.078-.629-1.573C-.359 15.474.079 19.201 2.353 21c1.754 1.393 4.254 1.558 6.687.835 2.462-.784 4.29-2.24 5.614-4.322.285-.406.54-.839.778-1.274l.088.062z M17.023 9.183c-.584-.893-1.724-1.394-3.206-1.394h-.137c-.135-.254-.344-.435-.584-.435h-.062c-.943.03-1.677.825-1.648 1.77.031.932.794 1.648 1.709 1.648h.06c.253-.031.449-.197.584-.42h.157c.765 0 1.485.192 2.129.571.494.291.935.701 1.245 1.228.355.62.5 1.282.436 1.96-.179 1.499-1.101 2.63-2.369 3.236-1.022.482-2.158.679-3.256.571-2.34-.197-4.114-1.35-4.698-2.869-.331-.839-.405-1.724-.164-2.599.344-1.245 1.138-2.158 1.904-2.646-.166-.42-.345-1.155-.42-1.693-2.783 1.95-3.903 5.084-2.616 7.889.868 1.858 2.631 3.02 4.735 3.02.584 0 1.153-.074 1.723-.21 3.657-.765 6.43-3.39 6.504-6.767.031-1.349-.42-2.676-1.336-3.665zM10.42 6.656c0-.932.794-1.648 1.708-1.648h.061c.945-.03 1.679.763 1.709 1.693.03.934-.794 1.648-1.708 1.648h-.06c-.914.013-1.649-.6-1.71-1.514a1.49 1.49 0 010-.179z"
      },
      {
        name: "TypeScript",
        icon: "typescript",
        type: "svg",
        color: "text-blue-600",
        svgPath: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125z M14.44 19.572v2.454c.398.204.863.36 1.393.467.53.107 1.084.161 1.66.161.577 0 1.117-.058 1.618-.173.501-.115.937-.293 1.307-.533.37-.24.662-.545.871-.917.21-.371.314-.81.314-1.316 0-.378-.057-.709-.172-.992a2.142 2.142 0 00-.506-.738 3.595 3.595 0 00-.806-.574 7.894 7.894 0 00-1.06-.448 13.87 13.87 0 01-.94-.368 4.052 4.052 0 01-.666-.36 1.407 1.407 0 01-.397-.368.787.787 0 01-.13-.458c0-.162.041-.304.122-.425a1.1 1.1 0 01.341-.313c.148-.86.33-.152.548-.197.217-.45.465-.068.742-.068.198 0 .403.016.615.048.212.032.421.083.627.153.206.07.404.159.595.265.191.107.368.232.531.376v-2.297a5.711 5.711 0 00-1.195-.376 7.253 7.253 0 00-1.47-.144c-.57 0-1.103.062-1.597.185-.494.123-.923.31-1.288.56a2.75 2.75 0 00-.875.959c-.212.385-.319.839-.319 1.36 0 .672.162 1.235.485 1.688.323.453.835.833 1.535 1.139.292.123.585.235.88.336.295.101.563.205.805.313.241.107.435.229.581.364.146.135.22.3.22.496a.766.766 0 01-.147.467 1.235 1.235 0 01-.397.328 1.98 1.98 0 01-.596.196c-.23.043-.47.064-.724.064a3.721 3.721 0 01-.676-.06 5.01 5.01 0 01-.693-.18 4.653 4.653 0 01-.672-.296 4.515 4.515 0 01-.585-.408zm-4.164-8.066h3.63v-1.962H5.098v1.962h3.63v10.543h1.546V11.506z"
      },
      {
        name: "Pusher",
        icon: "pusher",
        type: "svg",
        color: "text-pink-500",
        svgPath: "M11.998 0C5.366 0 0 5.368 0 12c0 6.63 5.366 12 11.998 12 6.634 0 12.002-5.37 12.002-12 0-6.632-5.368-12-12.002-12zM9.845 17.655c-.166.369-.65.563-1.016.396-.369-.166-.563-.65-.396-1.016.166-.369.65-.563 1.016-.396.368.165.563.65.396 1.016zm4.844.876c-.249.56-1.015.825-1.552.568-.577-.272-.825-1.016-.573-1.552.25-.56 1.015-.825 1.552-.568.566.272.825 1.016.573 1.552zm.506-1.541c-1.143.272-2.178-.389-2.441-1.62-.261-1.232.477-2.213 1.619-2.485 1.144-.272 2.178.389 2.441 1.62.262 1.221-.476 2.213-1.619 2.485zM5.347 18c-.506.187-1.012-.087-1.199-.526-.185-.46.076-.982.582-1.17.505-.187 1.01.087 1.198.526.184.46-.078.982-.581 1.17zm3.816-11.875l.496-2.088a.628.628 0 00-.457-.749.626.626 0 00-.749.457l-.496 2.088c-1.493.307-2.715 1.268-3.382 2.607-.667-.13-1.186-.294-1.48-.458 0 0-.284-.16-.413.025l-.136.219c-.105.173.027.272.027.272.343.3.8.562 1.39.785 0 1.908 1.274 3.524 3.024 4.064l.752 3.398a.627.627 0 00.749.458.627.627 0 00.457-.749l-.732-3.359c1.795-.472 3.125-2.107 3.125-4.047.577-.22 1.026-.474 1.366-.767 0 0 .132-.1.026-.272l-.136-.219c-.129-.186-.412-.025-.412-.025-.281.157-.784.32-1.437.447-.67-1.284-1.866-2.21-3.324-2.52l-.001-.032a.762.762 0 01.746-.775.764.764 0 01.775.746h.001l.001.033z"
      },
      {
        name: "Twilio",
        icon: "twilio",
        type: "svg",
        color: "text-red-500",
        svgPath: "M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z M15.108 10.672c.3-1.243-.763-1.866-2.064-2.303l.422-1.691-.03-.008-1.031-.257-.411 1.647-.824-.205.411-1.648-1.033-.257-.411 1.647-.412-.103-1.413-.353-.275 1.1s.763.175.747.186c.418.104.494.381.481.6l-.48 1.93c.029.008.066.018.108.037l-.109-.029-.673 2.696c-.051.126-.181.316-.473.244.11.015-.747-.187-.747-.187l-.512 1.179 1.334.333.73.181-.417 1.67 1.03.257.421-1.691.823.205-.417 1.684 1.03.257.417-1.67c1.708.323 2.991.192 3.534-1.35.436-1.245-.022-1.965-.923-2.432.656-.153 1.153-.584 1.285-1.475zm-2.303 3.217c-.31 1.244-2.406.572-3.088.403l.552-2.211c.681.17 2.862.507 2.536 1.808zm.31-3.226c-.283 1.134-2.03.557-2.6.416L13 8.988c.57.142 2.403.406 2.115 1.675z"
      },
      {
        name: "Firebase",
        icon: "firebase",
        type: "svg",
        color: "text-yellow-500",
        svgPath: "M3.89 15.672L2.787 13.64 0 8.792l2.426.018 1.41 2.596a.41.41 0 00.727-.002l1.49-2.583 2.425.015-3.16 5.56 1.102 2.045.445.827H3.39z M5.26 16.5l1.148-7.264.027-.18H8.24l-.206 1.568c-.026.196.24.314.38.157.528-.587 1.21-.872 2.048-.872 1.134 0 1.897.54 2.284 1.62.097.267.172.56.195.872.17.233.041.465.03.698L12.51 16.5h-2.856l.4-3.62a3.54 3.54 0 00-.023-.523c-.064-.372-.253-.555-.569-.555-.444 0-.756.214-.935.642-.179.427-.254.97-.181 1.627l.362 2.429H5.26z M13.198 16.304l.215-1.584c.026-.197-.241-.316-.38-.157a2.31 2.31 0 01-1.726.744c-1.134 0-2.04-.543-2.426-1.629-.097-.272-.172-.566-.199-.88-.017-.241-.019-.471-.007-.702l.46-3.596h2.856l-.4 3.626c-.097.745.229 1.088.698 1.088.444 0 .756-.214.934-.642.18-.427.255-.97.182-1.627l-.362-2.445H16l-1.56 7.804h-2.856z M23.998 8.792l-.006.01-3.952 7.705-2.254-.007 1.120-2.132 1.889-3.566-2.644-.017-1.333 2.614a.41.41 0 01-.727.002l-1.417-2.6-2.645-.016 4.359 7.719-2.118.012-5.647-10.01 10.28.069 3.048 5.393.047-.083 2-.184z"
      }
    ]
  }
];
