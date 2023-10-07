type EmojiProps = {
  label?: string
  emoji: React.ReactNode
}

const Emoji = ({ label, emoji, ...props }: EmojiProps) => {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label ?? ''}
      aria-hidden={label ? false : true}
    >
      {emoji}
    </span>
  )
}

export default Emoji
