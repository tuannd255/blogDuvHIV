class Ability
  include CanCan::Ability

  def initialize(user)
    # TO DO: Comment and Clap future
    if user && user.email.eql?("duchv2307@gmail.com")
      if user.isAdmin?
        can :manage, :all
      else
        can :read, :all
        can [:create], Comment
        can [:update, :destroy], Comment do |comment|
          user == comment.user
        end
        can [:create, :update], Clap
      end
    else
      can :read, :all
    end
  end
end
