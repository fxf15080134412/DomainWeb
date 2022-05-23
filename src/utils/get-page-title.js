import defaultSettings from '@/settings'

const title = defaultSettings.title || '总管理后台-HRO'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
