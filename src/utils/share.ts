export function shareResult(personalityName: string): Promise<boolean> {
  const shareText = `我的灵魂卡牌是「${personalityName}」！别装了，快来测测你的真面目。`;
  const shareUrl = window.location.origin;

  if (navigator.share) {
    return navigator
      .share({
        title: "命运之书 - 灵魂卡牌测试",
        text: shareText,
        url: shareUrl,
      })
      .then(() => true)
      .catch(() => false);
  }

  const fullText = `${shareText}\n${shareUrl}`;
  if (navigator.clipboard) {
    return navigator.clipboard
      .writeText(fullText)
      .then(() => true)
      .catch(() => false);
  }

  return Promise.resolve(false);
}
