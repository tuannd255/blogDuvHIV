class Ability
  include CanCan::Ability

  def initialize(user)
    if user
      if user.isAdmin?
        can :manage, :all
      else
        can :read, :all
        can [:create, :update], Comment
        can [:create, :update], Clap
      end
    else
      can :read, :all
    end
  end
end
