Jbuilder.new do
  json.(
    @user,
    :id,
    :name,
    :email
  )
end
