# frozen_string_literal: true

class AuthenticateUser
  prepend SimpleCommand

  def initialize(email, password)
    @email = email
    @password = password
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_accessor :email, :password

  def user
    user = User.find_by(email:)
    return user if user&.authenticate(password)

    errors.add :user_authentication, 'Credenciais inválidas.'
    nil
  end
end
